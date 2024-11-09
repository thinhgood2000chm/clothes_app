FROM python:3.8.1-slim
USER 0
RUN mkdir /root/thinhnx
RUN apt-get update && apt-get install -y gcc libmariadb-dev-compat libmariadb-dev ffmpeg libsm6 libxext6 default-libmysqlclient-dev
WORKDIR /clothes
COPY . /clothes
RUN pip3 install -r requirements.txt
EXPOSE 8999
CMD [ "uvicorn" ,"main:app", "--host", "0.0.0.0", "--port", "8999"]