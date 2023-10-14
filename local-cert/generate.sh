openssl genrsa -des3 -passout pass:Local@123 -out LocalCA.key 2048 
openssl req -x509 -new -nodes -passin pass:Local@123 -key LocalCA.key -sha256 -days 3650 -out LocalCA.pem -subj "/C=JP/ST=Tokyo/L=Tokyo/O=youtubesharing/CN=youtubesharing.com"


openssl genrsa -out local.youtubesharing.com.key 2048
openssl req -new -key local.youtubesharing.com.key -out local.youtubesharing.com.csr  -subj "/C=JP/ST=Tokyo/L=Tokyo/O=youtubesharing/CN=youtubesharing.com"

openssl x509 -req -in local.youtubesharing.com.csr -passin pass:Local@123 -CA LocalCA.pem -CAkey LocalCA.key \
-CAcreateserial -out local.youtubesharing.com.crt  -days 3650 -sha256 -extfile local.youtubesharing.com.ext

openssl genrsa -out api-local.youtubesharing.com.key 2048
openssl req -new -key api-local.youtubesharing.com.key -out api-local.youtubesharing.com.csr  -subj "/C=JP/ST=Tokyo/L=Tokyo/O=api-youtubesharing/CN=youtubesharing.com"

openssl x509 -req -in api-local.youtubesharing.com.csr -passin pass:Local@123 -CA LocalCA.pem -CAkey LocalCA.key \
-CAcreateserial -out api-local.youtubesharing.com.crt  -days 3650 -sha256 -extfile api-local.youtubesharing.com.ext

echo "1325" | sudo -S security add-trusted-cert -d -r trustRoot -k "/Library/Keychains/System.keychain" LocalCA.pem

ssl://api-local.youtubesharing.com:3000?key=local-cert/api-local.youtubesharing.com.key&cert=local-cert/api-local.youtubesharing.com.crt