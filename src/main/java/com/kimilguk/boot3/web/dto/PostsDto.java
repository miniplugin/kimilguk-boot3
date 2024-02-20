package com.kimilguk.boot3.web.dto;

import java.time.LocalDateTime;

import com.kimilguk.boot3.domain.posts.Posts;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor//생성자자 메소드를 자동을 생성한다
@Getter @Setter//롬복(Lombom)모듈에서 Get, Set 메소드를 자동으로 생성한다.
public class PostsDto {
	//멤버변수는 Posts 와 일치한다.
    private long id;//게시글 번호
    private String title;//글 제목
    private String content;//글 내용
    private String author;//글 작성자 아이디
    private Long fileId;//첨부파일 번호
    private LocalDateTime createDate;
    private LocalDateTime modifieDate;
    //@컨트롤러 클래스에서 저장 시 사용, DB엔티티 값을 Dto객체에 담아서 조회(자동생성코드사용)
	public PostsDto(Posts entity) {
        //super(); Source -> Generate Constructor using Fields 창 에서 super() 부분 Omit 생략체크 후 진행하면 된다.
        this.id = entity.getId();
        this.title = entity.getTitle();
        this.content = entity.getContent();
        this.author = entity.getAuthor();
        this.fileId = entity.getFileId();
        this.createDate = entity.getCreateDate();
        this.modifieDate = entity.getModifieDate();
	}
	//@컨트롤러 클래스에서 사용 빌더형식으로 생성=임시저장(자동생성코드사용)
    @Builder
	public PostsDto(long id, String title, String content, String author, Long fileId) {
		this.id = id;
		this.title = title;
		this.content = content;
		this.author = author;
		this.fileId = fileId;
	}
    //Posts 엔티티(DB)에 빌더형식 사용=저장
    public Posts toEntity() {
    	return Posts.builder()
    			.title(title)
    			.content(content)
    			.author(author)
    			.fileId(fileId)
    			.build();
    }
}
