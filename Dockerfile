FROM nginx:alpine

COPY _site /usr/share/nginx/html/public
COPY nginx.conf /etc/nginx/nginx.conf
RUN mkdir -p /etc/nginx/logs/

EXPOSE 80
EXPOSE 8080

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
