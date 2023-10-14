# Add root CA to system keychain
OS="$(uname -s)"

if [ "${OS}" == "Darwin" ]; then
  sudo -S security add-trusted-cert -d -r trustRoot -k "/Library/Keychains/System.keychain" LocalCA.pem
elif [ "${OS}" == "Linux" ]; then
  sudo apt-get install -y ca-certificates
  sudo cp  LocalCA.pem /usr/local/share/ca-certificates/LocalCA.crt
  sudo update-ca-certificates
  :
else
  sudo certutil -addstore -f "ROOT" "LocalCA.pem"
fi
