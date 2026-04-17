# Feature: Emotion V2 (예시)

매치별 감정 기록 기능의 예시 스펙. 실제 사용할 때 복사해서 수정.

```yaml
domain: emotion-v2
layer: widgets
# figma: https://figma.com/design/xxx/yyy?node-id=1-2

endpoints:
  - name: getEmotionRecord
    method: GET
    path: /emotion/:matchRecordId
    params:
      matchRecordId: number
    response: EmotionResponseDTO

  - name: createEmotion
    method: POST
    path: /emotion
    request: CreateEmotionRequestDTO
    response: EmotionResponseDTO
    invalidates: [getEmotionRecord]

  - name: deleteEmotion
    method: DELETE
    path: /emotion/:id
    params:
      id: number
    response: "ApiResponse<null>"
    invalidates: [getEmotionRecord]

types:
  Emotion:
    id: number
    type: "'HAPPY' | 'SAD' | 'ANGRY' | 'NEUTRAL'"
    matchRecordId: number
    createdAt: string
  EmotionResponseDTO: "ApiResponseWithNoSuccess<Emotion[]>"
  CreateEmotionRequestDTO:
    type: "Emotion['type']"
    matchRecordId: number

msw:
  scenarios:
    - endpoint: createEmotion
      when: "body.matchRecordId === 0"
      status: 400
      response: { error: "invalid match" }
    - endpoint: deleteEmotion
      when: "params.id === '0'"
      status: 404
      response: { error: "not found" }
```

## 메모 공간 (자유 기술)

이 아래는 파싱에서 무시되니 자유롭게 메모.

- 관련 Figma 페이지: (URL)
- 백엔드 담당자: (이름)
- 특이사항:
