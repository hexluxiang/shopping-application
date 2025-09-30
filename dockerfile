# 第一步：用Node环境打包前端代码
# FROM node:16-alpine as builder 
FROM docker.xuanyuan.me/library/node:latest as builder
# 新建一个工作目录
WORKDIR /app
# 把项目的依赖文件复制到容器里
COPY package.json package-lock.json ./
# 安装依赖（和你本地npm install一样）
RUN npm install
# 把整个项目复制到容器里
COPY . .
# 打包生产环境代码（如果你的项目用yarn，就改成yarn build）
RUN npm run build

RUN echo "build完成"

# 第二步：用Nginx运行打包好的代码
# FROM nginx:alpine
FROM nginx:alpine 
# 把第一步打包好的dist文件夹，复制到Nginx的默认目录
COPY --from=builder /app/dist /var/www/my-shop
# 复制自定义的Nginx配置（下面会创建这个文件）
COPY nginx.conf /etc/nginx/conf.d/default.conf
# 告诉Docker，这个容器会用到80端口
EXPOSE 81
# 启动Nginx
CMD ["nginx", "-g", "daemon off;"]