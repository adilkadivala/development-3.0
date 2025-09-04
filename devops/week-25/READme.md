<!-- pm2 -->

# pm2

pm2 is a npm library that keeps app running even killing the process, this is a super use full when we deploying server on cloude like aws etc.

```
npm i -g pm2
```

start application using

```
pm2 start app.js
```

- Keeps apps running continuously.

- Automatically restarts crashed apps.

- Provides monitoring and logging.

- Supports running multiple app instances for better performance.

<!-- curl -->

# curl

curl is service like postman, open terminal, make sure you have curl, and run following command

```
curl https://dummyjson.com/users
```

for learning more deeply ,, run this command in terminal

```
curl --manual
```

<!-- lsof -->

# lsof

you're on linux and don't know how to verify which service is running on which port, lsof will help to you..


lsof -- this will list all running services

```
lsof
```

if you wanna see on perticuler port then copy following, and enter your port no. after (:)

```
lsof -i :3000
```
