FROM nginx
COPY ./dist/apps/angular-raspi-ui2 /usr/share/nginx/html
COPY ./tools/replacer/replace.sh /docker-entrypoint.d/00-replace.sh
RUN chmod 777 /docker-entrypoint.d/00-replace.sh
