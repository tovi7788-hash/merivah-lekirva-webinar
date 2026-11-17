DO $mig$
DECLARE def text;
BEGIN
  def := pg_get_functiondef('public.enqueue_webinar_registration_for_make()'::regprocedure);
  IF position('''youtube-yuval''' in def) = 0 THEN
    def := replace(def, '''email-yuval-internal'', ''hameanyenim''', '''email-yuval-internal'', ''youtube-yuval'', ''hameanyenim''');
    IF position('''youtube-yuval''' in def) = 0 THEN RAISE EXCEPTION 'anchor not found'; END IF;
    EXECUTE def;
  END IF;
END
$mig$;