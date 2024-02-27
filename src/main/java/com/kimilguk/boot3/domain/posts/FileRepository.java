package com.kimilguk.boot3.domain.posts;

import org.springframework.data.jpa.repository.JpaRepository;
//JpaRepository<엔티티클래스명, PK타입>을 상속하면 기본CRUD 메소드가 자동생성된다.
public interface FileRepository extends JpaRepository<File, Long> {
	//save(), findAll(),수정은 엔티티의 값만수정하면 함수없이 DB값도 연동된다, delete()
}
