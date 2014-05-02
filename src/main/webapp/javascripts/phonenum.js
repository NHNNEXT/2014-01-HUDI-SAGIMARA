function phone_valid(input)
{
	// 01012345678과 같은 연속적인 입력
	var continous_phonenum = /^\d{11}$/;
	// 010-1234-5678, 010 1234 5678과 같이 하이픈이나 공백으로 구분되는 입력
	var divide_phonenum = /^\(?([0-9]{3})\)?[- ]?([0-9]{4})[- ]?([0-9]{4})$/;

	if(input.match(continous_phonenum) || input.match(divide_phonenum))
	{
		// 휴대폰 형식에 맞는 String
		return true;
	}
	else
	{
		// 휴대폰 형식이 아닌 경우
		return false;
	}

	/* 추가 기능
	
	- 앞자리 세자리에 대한 예외적용(010 부분)
	- 국제 번호 형식에 대한 처리(+82 1012345678 등)

	*/
}