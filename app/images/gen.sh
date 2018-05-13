cd $(dirname $0)
for d in ./*/; do
  cd $d
  echo "// @flow" > index.js
  for f in *.png; do
    echo "export const ${f%.*} = require(\"./${f}\");" >> index.js
  done
  cd -
done
