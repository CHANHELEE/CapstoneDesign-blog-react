
import {React,useEffect,useState} from 'react'
import Navigation from '../component/Navigation'
import { Routes, Route ,Link} from "react-router-dom";
import {useLocalStorage,getStorageItem}  from '../utils/useLocalStorage';
import { Container, Row, Col, Button } from 'react-bootstrap';
import ReactApexChart from "react-apexcharts"; 


const Main = ({setNavVisible}) => {
  setNavVisible(true);
  const [value, onChange] = useState(new Date());

  //오늘 날짜 가져오기
  let now = new Date();
  let todayYear = now.getFullYear();
  let todayMonth = now.getMonth() + 1;
  let todayDate = now.getDate();
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  let dayOfweek = week[now.getDay()];

  //사용자가 지정한 지역의 날씨 가져오기
  const [nowWeather, setNowWeather]=useState(null);


  const cityLocationList = [
    {city : "서울", lat : 37.5666103, lon : 126.9783882},
    {city : "강원도", lat : 37.8603672, lon : 128.3115261},
    {city : "경기도", lat : 37.4363177, lon : 127.550802},
    {city : "경상남도", lat : 35.4414209, lon : 128.2417453},
    {city : "경상북도", lat : 36.6308397, lon : 128.962578},
    {city : "광주광역시", lat : 35.160032, lon : 126.851338},
    {city : "대구광역시", lat : 35.87139, lon : 128.601763},
    {city : "대전광역시", lat : 36.3504396, lon : 127.3849508},
    {city : "부산광역시", lat : 35.179816, lon : 129.0750223},
    {city : "세종특별자치시", lat : 36.4803512, lon : 127.2894325},
    {city : "울산광역시", lat : 35.5394773, lon : 129.3112994},
    {city : "전라남도", lat : 34.9007274, lon : 126.9571667},
    {city : "전라북도", lat : 35.6910153, lon : 127.2368291},
    {city : "제주특별자치도", lat : 33.4273366, lon : 126.5758344},
    {city : "충청남도", lat : 36.6173379, lon : 126.8453965},
    {city : "충청북도", lat : 36.7853718, lon : 127.6551404},
    {city : "인천광역시", lat : 37.4559418, lon : 126.7051505},
  ]


  let cityInfo = cityLocationList.filter((item)=>{
    // 백엔드 데이터(사용자 데이터)
    return item.city == "서울"
  })

  const getWeatherByCityLocation=async(lat, lon)=>{
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f6dac6728e6a482af225b0345eb090e9&&units=metric`
    let response = await fetch(url);
    let data = await response.json();
    setNowWeather(data);
  }

  useEffect(()=>{
    getWeatherByCityLocation(cityInfo[0].lat, cityInfo[0].lon)
  },[])

  
  //최근 나의 흔적, 현재 날짜 기준으로 근 7일간
  const donutData = {
    series: [2, 1, 2, 1, 1, 0],
    options: {
      chart: {
        type: 'donut',
      },
      legend: {
        position: 'right'
      },
      // responsive: [{
      //   breakpoint: 480,
      // }],
      // plotOptions: {
      //   pie: {
      //     donut: {
      //       // hollow: {  
      //       //   margin: 15,
      //       //   size: '70%',
      //       //   image: '../../css/images/a-icon.jpg',
      //       //   imageWidth: 64,
      //       //   imageHeight: 64,
      //       //   imageClipped: false
      //       // },
      //     }
      //   }
      // },
      labels: ["기쁨", "슬픔", "화남", "상처", "불안" ,"당황"]
      // title: {
      //   text: '이벤트별 통계',
      //   align: 'center'
      // },
    },
  }
  return (
    <div>
      <Container>
        <Col className="body">
          <Row>
            <p>{todayYear}년 {todayMonth}월 {todayDate}일 {dayOfweek}요일
            | {cityInfo[0].city} {nowWeather?.main.temp}° {nowWeather?.weather[0].main}</p>  
          </Row>

          <Row className='box'>
            <Col>
              <h4>이딘두님, 오늘 하루 어떠셨나요? 일상을 기록하고 근사한 밤을 보내세요</h4>
              <Link to="/diary-create"><Button>일기 쓰러가기</Button></Link>
            </Col>
            <Col className='bannerImage'>
              <img src="" />
            </Col>
          </Row>

          <Row>
            {/* 프롤로그 내용 누르면 상세페이지로 이동*/}
            <Col>
              <h3>Prologue✨</h3>
              <Row className='box'>
                <Col>
                  <h5>제목부분</h5>
                  <p>상세내용 미리보기</p>
                  <p>날짜</p>
                </Col>
                <Col>
                  <h5>제목부분</h5>
                  <p>상세내용 미리보기</p>
                  <p>날짜</p>
                </Col>
                <Col>
                  <h5>제목부분</h5>
                  <p>상세내용 미리보기</p>
                  <p>날짜</p>
                </Col>
              </Row>
            </Col>

            <Col>
              <h3>최근 나의 흔적</h3>
                <Col className='box'>
                  <Row>
                    <Col>        
                    <ReactApexChart
                      options={donutData.options}
                      series={donutData.series}
                      type="donut"
                      width="400"
                    />
                    </Col>
                    <Col>퍼센테이지</Col>
                  </Row>
                </Col>
              </Col>
            </Row>
          <Col>


          </Col>

        </Col>

      </Container>
    </div>
  )
}


export default Main