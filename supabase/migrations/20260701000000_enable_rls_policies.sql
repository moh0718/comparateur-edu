-- =============================================================================
-- Sécurité : active Row-Level Security (RLS) + policies sur le schéma public.
-- Corrige l'alerte Supabase "rls_disabled_in_public" (table publiquement accessible).
--
-- Modèle d'accès de l'app :
--   * Lecture publique du site      -> clé anon (rôle "anon")
--   * Écritures admin (/admin)      -> clé anon + session authentifiée (rôle "authenticated"),
--                                      restreinte à l'email admin
--   * Scripts Python (scraping)     -> clé service_role, qui CONTOURNE la RLS (aucun impact)
--
-- Idempotent : ce script peut être ré-exécuté sans risque.
-- À exécuter dans Supabase -> SQL Editor (ou via `supabase db push`).
-- =============================================================================

-- 1) Activer la RLS sur TOUTES les tables du schéma public
DO $$
DECLARE r RECORD;
BEGIN
  FOR r IN SELECT tablename FROM pg_tables WHERE schemaname = 'public' LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', r.tablename);
  END LOOP;
END $$;

-- 2) Fonctions utilitaires : (re)créent les policies uniquement si la table existe
CREATE OR REPLACE FUNCTION public._rls_public_read(tbl text, using_cond text)
RETURNS void AS $fn$
BEGIN
  IF to_regclass('public.' || tbl) IS NULL THEN RETURN; END IF;
  EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', 'public_read_' || tbl, tbl);
  EXECUTE format(
    'CREATE POLICY %I ON public.%I FOR SELECT TO anon, authenticated USING (%s)',
    'public_read_' || tbl, tbl, using_cond
  );
END;
$fn$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public._rls_admin_all(tbl text)
RETURNS void AS $fn$
DECLARE
  cond text := 'lower(coalesce(auth.jwt() ->> ''email'', '''')) = ''mohcherif2012@gmail.com''';
BEGIN
  IF to_regclass('public.' || tbl) IS NULL THEN RETURN; END IF;
  EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', 'admin_all_' || tbl, tbl);
  EXECUTE format(
    'CREATE POLICY %I ON public.%I FOR ALL TO authenticated USING (%s) WITH CHECK (%s)',
    'admin_all_' || tbl, tbl, cond, cond
  );
END;
$fn$ LANGUAGE plpgsql;

-- 3) Application des policies
--    Lecture publique (site) :
SELECT public._rls_public_read('institutions', 'true');
SELECT public._rls_public_read('banks',        'true');
SELECT public._rls_public_read('bank_rates',   'true');
SELECT public._rls_public_read('posts',        'status = ''published''');  -- seuls les articles publiés

--    Écriture réservée à l'admin authentifié (les logs restent privés : pas de lecture publique) :
SELECT public._rls_admin_all('institutions');
SELECT public._rls_admin_all('banks');
SELECT public._rls_admin_all('bank_rates');
SELECT public._rls_admin_all('posts');
SELECT public._rls_admin_all('scraping_logs');

-- NOTE : toute table alimentée uniquement par les scripts (service_role) a la RLS
-- activée sans policy => inaccessible en anon, mais lisible/écrivable par service_role.

-- 4) Nettoyage des fonctions utilitaires
DROP FUNCTION public._rls_public_read(text, text);
DROP FUNCTION public._rls_admin_all(text);
