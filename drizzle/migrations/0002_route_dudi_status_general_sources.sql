DO $mig$
DECLARE def text;
BEGIN
  def := pg_get_functiondef('public.enqueue_webinar_registration_for_make()'::regprocedure);
  IF position('''dudi-kapler''' in def) = 0 THEN
    def := replace(def, '''influencer-odel'',', '''influencer-odel'', ''dudi-kapler'', ''status-tovi'',');
    def := replace(def, 'ELSIF source_code = ''prog'' THEN', 'ELSIF source_code IN (''prog'', ''general'') THEN');
    IF position('''dudi-kapler''' in def) = 0 OR position('''general''' in def) = 0 THEN RAISE EXCEPTION 'make anchor not found'; END IF;
    EXECUTE def;
  END IF;
  def := pg_get_functiondef('public.enqueue_webinar_google_group()'::regprocedure);
  IF position('''general''' in def) = 0 THEN
    def := replace(def, '(source_code = ''prog'' AND NEW.phone IS NULL)', '(source_code IN (''prog'', ''general'') AND NEW.phone IS NULL)');
    IF position('''general''' in def) = 0 THEN RAISE EXCEPTION 'google anchor not found'; END IF;
    EXECUTE def;
  END IF;
END
$mig$;