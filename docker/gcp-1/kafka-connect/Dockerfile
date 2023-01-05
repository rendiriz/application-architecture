ARG image
FROM ${image}

## Install connectors
RUN echo "\nInstalling all required connectors...\n" && \
  confluent-hub install --no-prompt confluentinc/kafka-connect-jdbc:10.6.0