package com.kimilguk.boot3.domain.posts;

import org.springframework.data.jpa.repository.JpaRepository;
//JpaRepository<엔티티클래스명, PK타입>을 상속하면 기본CRUD 메소드가 자동 생성된다.
//@Repository //이 애노테이션은 생략해도 정상작동 된다. 우리 작업에서는 사용하지 않는다.
public interface PostsRepository extends JpaRepository<Posts, Long> {
	//save(), findAll(),수정은 엔티티의 값만수정하면 DB값도 연동된다, delete()
}
