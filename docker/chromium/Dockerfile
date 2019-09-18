FROM dockerhub.paypalcorp.com/paas/ubuntu

RUN apt-get update \
    && apt-get install -y wget \
    && wget -q -O - --no-check-certificate https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable

# Create chrome user to run chrome with non-elevated privileges
RUN groupadd -r chrome && useradd -r -g chrome -G audio,video chrome \
    && mkdir -p /home/chrome && chown -R chrome:chrome /home/chrome
USER chrome

# Expose port 9222 for Chrome headless communication
EXPOSE 9222

ENTRYPOINT [ "google-chrome-stable" ]
# Look into changing the --no-sandbox option to something more secure
CMD [ "--headless", "--disable-gpu", "--remote-debugging-address=0.0.0.0", "--remote-debugging-port=9222", "--no-sandbox" ]