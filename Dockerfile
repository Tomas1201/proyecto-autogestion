FROM mysql:8.4.2

# Set environment variables
ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=example_db
ENV MYSQL_USER=user

# Copy initialization scripts
COPY ./init.sql /docker-entrypoint-initdb.d/

# Expose the MySQL port
EXPOSE 3306

# Health check to ensure MySQL is running
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD mysqladmin ping -h localhost || exit 1

# Use a custom configuration file
COPY ./my.cnf /etc/mysql/conf.d/

# Set the default command to run MySQL
CMD ["mysqld"]
# Optional: Add a volume for persistent data storage
VOLUME /var/lib/mysql