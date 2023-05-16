import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe} from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    //test에도 실제 환경을 적용시켜주는게 좋음 / 실제 환경과 테스트 환경이 다르면 문제가 생길 수 있음 
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      whitelist : true, // 데코레이터가 없는 속성은 거름
      forbidNonWhitelisted: true, // 데코레이터가 없는 속성이 있으면 리퀘스트 자체를 막음
      transform: true, // 유저가 보낸 것을 우리가 원하는 타입으로 변환
    }) ); // 유효성 검사
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to my Movie API');
  });

  describe("/movies", () => {
    it("GET", () => {
      return request(app.getHttpServer())
      .get("/movies")
      .expect(200)
      .expect([]);
    });

    it("POST", () => {
      return request(app.getHttpServer())
      .post("/movies")
      .send({
        title: "Test",
        year: 2000,
        genres: ["test"],
      })
      .expect(201);
    });
    it("POST 400", () => {
      return request(app.getHttpServer())
      .post("/movies")
      .send({
        title: "Test",
        year: 2000,
        genres: ["test"],
        other : "thing",
      })
      .expect(400);
    });

    it("DELETE", () => {
      return request(app.getHttpServer())
      .delete("/movies")
      .expect(404);
    });
  });

  describe("/movies/:id", () => {
    it("GET 200", () => {
      return request(app.getHttpServer())
      .get("/movies/1")
      .expect(200);
    });
    it("GET 404", () => {
      return request(app.getHttpServer())
      .get("/movies/999")
      .expect(404);
    });

    it("PATCH 200", () => {
      return request(app.getHttpServer())
      .patch("/movies/1")
      .send({title: "Updated Test"})
      .expect(200);
    });

    it("DELETE 200", () => {
      return request(app.getHttpServer())
      .delete("/movies/1")
      .expect(200);
    })
  });

  
});
