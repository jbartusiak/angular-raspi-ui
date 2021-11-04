FROM nginx
ENV HOST_IP_ADDRESS="TESTING_THIS"
COPY ./dist/apps/angular-raspi-ui2 /usr/share/nginx/html
COPY ./tools/replacer/replace.sh /docker-entrypoint.d/00-replace.sh
RUN echo "Setting privileges"
RUN chmod 777 /docker-entrypoint.d/00-replace.sh
