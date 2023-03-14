import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_SUPABASE_URL,
  process.env.SUPABASE_PRIVATE_KEY
)

export default supabase
