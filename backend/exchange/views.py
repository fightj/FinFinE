from django.shortcuts import render
from django.conf import settings
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
import requests

# Create your views here.
@api_view(['GET'])
def exchange(request):
    API_KEY = settings.EXCHANGE_API_KEY
    EXCHANGE_API_URL = f'https://www.koreaexim.go.kr/site/program/financial/exchangeJSON'

        # 오늘 날짜 가져오기
    from datetime import datetime
    today_date = datetime.now().strftime("%Y%m%d")  # YYYYMMDD 형식
    params = {
        'authkey': API_KEY,
        'searchdate' : today_date, # 오늘날짜
        'data' : "AP01",
    }

    response = requests.get(EXCHANGE_API_URL, params=params, verify=False).json()
    
    return Response(response)

    # try:
    #     # SSL 인증 검증 비활성화
    #     response = requests.get(EXCHANGE_API_URL, params=params, verify=False)
    #     response.raise_for_status()  # HTTP 오류 발생 시 예외 발생
    #     data = response.json()

    #     # 주요 필드만 필터링
    #     filtered_data = [
    #         {
    #             "currency": item["cur_unit"],
    #             "name": item["cur_nm"],
    #             "buy_rate": float(item["ttb"].replace(",", "")),
    #             "sell_rate": float(item["tts"].replace(",", "")),
    #         }
    #         for item in data if item["cur_unit"] not in ["", "원화"]
    #     ]

    #     return Response({"success": True, "data": filtered_data})

    # except requests.exceptions.RequestException as e:
    #     return Response({"success": False, "error": str(e)})