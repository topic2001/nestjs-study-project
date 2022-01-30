## Description

purrsong-admin.v1

## Installation

```bash
$ yarn install

$ yarn prisma generate --schema src/modules/prisma/purrsongV3.prisma ## prisma 파일 변경될때마다 실행.
$ yarn prisma generate --schema src/modules/prisma/purrsongProduction.prisma ## prisma 파일 변경될때마다 실행.

$ yarn prisma db pull --schema src/modules/prisma/purrsongV3.prisma ## database에 있는 schema 정보 prisma파일로 가져 오고 싶을때 실행.
$ yarn prisma db pull --schema src/modules/prisma/purrsongProduction.prisma ## database에 있는 schema 정보 prisma파일로 가져 오고 싶을때 실행.

```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```
