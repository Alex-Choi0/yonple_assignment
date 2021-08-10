import { HttpException, HttpStatus } from "@nestjs/common";

export function errcodeThrow(str: string){

  // 에러처리 : 해당 번호의 게시물이 없을 경우(404)
  if(str === "nonexist") throw new HttpException("해당번호는 존재하지 않습니다.", HttpStatus.NOT_FOUND)

  // 에러처리  : 인증 정보가 없을 경우(401)
  else if(str === "auth") throw new HttpException('인증정보가 존재하지 않습니다.', HttpStatus.UNAUTHORIZED);

  // 회원가입 에러처리 1 : 해당 이메일이 이미 존재할 경우(403)|
  else if(str === '1-1') throw new HttpException('해당 이메일은 이미 존재합니다.', HttpStatus.FORBIDDEN);

  // 회원가입 에러처리 2 : 이메일, 닉네임, 비밀번호 컬럼이 비었을 경우(400)|
  else if(str === '1-2') throw new HttpException('이메일, 닉네임 또는 비밀번호 컬럼이 비어있습니다.', HttpStatus.BAD_REQUEST);

  // 회원가입 에러처리 3 : 닉네임이 10자 초과인 경우(403)|
  else if(str === '1-3') throw new HttpException('닉네임이 10자 초과하였습니다.', HttpStatus.FORBIDDEN);

  // 회원가입 에러처리 4 : 비밀번호에 영문과 숫자가 포함되지 않았을 경우(403)
  else if(str === '1-4') throw new HttpException('비밀번호는 영문과 숫자가 포함되야 합니다.', HttpStatus.FORBIDDEN);

  // 로그인 에러처리 1 : 존재하지 않는 이메일일 경우(403)
  else if(str === '2-1') throw new HttpException('해당 이메일은 존재하지 않습니다.', HttpStatus.FORBIDDEN);

  // 로그인 에러처리 2 : 비밀번호가 틀렸을 경우(403)
  else if(str === '2-2') throw new HttpException('해당 비밀번호가 틀렸습니다.', HttpStatus.FORBIDDEN);

  // 게시물 생성 에러처리 1 : 제목이 없을 경우(400)
  else if(str === '3-1') throw new HttpException('제목이 존재하지 않습니다.', HttpStatus.BAD_REQUEST);

  // 게시물 생성 에러처리 2 : 내용이 없을경우(400)
  else if(str === '3-2') throw new HttpException('내용이 존재하지 않습니다.', HttpStatus.BAD_REQUEST);

  // 게시물 생성 에러처리 3 : 제목이 30자가 넘어갈 경우(403)
  else if(str === "3-3") throw new HttpException('제목이 30자가 넘어가면 안됩니다.', HttpStatus.FORBIDDEN);

  // 게시물 삭제 에러처리 2 : 해당 게시물의 작성자가 아닐 경우(401)
  else if(str === "6-2") throw new HttpException('해당 게시물의 작성자가 아닙니다.', HttpStatus.UNAUTHORIZED);

  return ;
}
