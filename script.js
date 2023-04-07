function showLoading() {
  document.getElementById("loading").style.display = "block";
  setTimeout(function () {
    search();
  }, 1000); // 로딩 화면을 1초 동안 보여준 후 search 함수 호출
}
function search() {
  const api_key =
    document.getElementById('api_key').value
  const keywords = document.getElementById('keywords').value
  const messages = [
    { role: 'system', content: 'You are a CHEEF.' },
    { role: 'user', content: keywords + '레시피 알려줘' },
  ]
  const config = {
    headers: {
      Authorization: `Bearer ${api_key}`,
      'Content-Type': 'application/json',
    },
  }
  const data = {
    model: 'gpt-3.5-turbo',
    temperature: 0.5,
    n: 1,
    messages: messages,
  }
  axios
    .post('https://api.openai.com/v1/chat/completions', data, config)
    .then(function (response) {
      let resultDiv = document.getElementById('result')
      resultDiv.innerHTML = ''
      response.data.choices.forEach(function (choice, index) {
        resultDiv.innerHTML += `<div>${choice.message.content
          .split('\n')
          .join('<br/>')}</div>`
      })
      var html = katex.renderToString(resultDiv.innerHTML, {
        throwOnError: false
      });
    })
    .catch(function (error) {
      console.error(error)
    })
}
