var storeId = process.env.NEXT_PUBLIC_STORE_ID;
var env = process.env.VERCEL_ENV;
var branchName = process.env.VERCEL_GIT_COMMIT_REF;

var regex = /(WOOLESS-\d+)-(\d+)-?.*/gm;
// index 0 = whole match
// index 1 = wooless task id
// index 2 = store id
var matches = regex.exec(branchName);

if (env == 'preview' && matches?.[2] == storeId) {
  console.log('✅ - Preview branch matched store ID. Build proceeding...');
  process.exit(1);
} else if (env == 'production' && matches?.[2] == storeId) {
  console.log('✅ - Production branch matched store ID. Build proceeding...');
  process.exit(1);
} else {
  console.log('🛑 - Not in production or does not match store ID from branch name. Skipping...');
  process.exit(0);
}

// Reference: https://vercel.com/guides/how-do-i-use-the-ignored-build-step-field-on-vercel
