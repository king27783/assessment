'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivision = document.getElementById('result-area');
const tweetDivision = document.getElementById('tweet-area');

assessmentButton.addEventListener(    //assessmentButton から以下のイベントを検知した場合、第二引数の関数を実行する
  'click',
  () => {
    const userName = userNameInput.value;
     if (userName.length === 0) {
       // 名前が空の時は処理を終了する
       return;
     }

    // TODO ツイートエリアの作成
    resultDivision.innerText = '';                     //関数が実行される度に空っぽにする
    const header = document.createElement('h3')        // h3タグの要素を作成して代入
    header.innerText = '診断結果';                      // headerに診断結果という文字列を入力
    resultDivision.appendChild(header);                // devタグに子要素として変数headerを入れてID経由で上記の内容を出力

    const paragraph = document.createElement('p');     // pタグの要素を作成して代入
    const result = assessment(userName);               // 変数resultにassessment関数の結果を代入
    paragraph.innerText = result;                      //resultの内容をpタグで作成
    resultDivision.appendChild(paragraph);             //devタグに子要素として変数paragraphを入れて出力
    
    //Twitterのエリア作成
    tweetDivision.innerText = '';
    const anchor = document.createElement('a');        //aタグの作成
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=' + encodeURIComponent ('あなたのいいところ') + '&ref_src=twsrc%5Etfw';   //変数にURIを一部エンコーディングしたものを含めたリンクを代入
    anchor.setAttribute('href',hrefValue);             //リンクを変数anchorに設定
    anchor.setAttribute('class','twitter-hashtag-button');
    anchor.setAttribute('data-text',result);
    anchor.innerText = 'Tweet #あなたのいいところ';

    tweetDivision.appendChild(anchor);


    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivision.appendChild(script);
  }
)

userNameInput.addEventListener(
  'keydown',
  (event) => {
    if (event.code === 'Enter') {
      assessmentButton.dispatchEvent(new Event('click'));
    }
  }
)



const answers =[
'###userName###のいいところは声です。###userName###の特徴的な声は皆を惹きつけ、心に残ります。',
'###userName###のいいところはまなざしです。###userName###に見つめられた人は、気になって仕方がないでしょう。',
'###userName###のいいところは情熱です。###userName###の情熱に周りの人は感化されます。',
'###userName###のいいところは厳しさです。###userName###の厳しさがものごとをいつも成功に導きます。',
'###userName###のいいところは知識です。博識な###userName###を多くの人が頼りにしています。',
'###userName###のいいところはユニークさです。###userName###だけのその特徴が皆を楽しくさせます。',
'###userName###のいいところは用心深さです。###userName###の洞察に、多くの人が助けられます。',
'###userName###のいいところは見た目です。内側から溢れ出る###userName###の良さに皆が気を惹かれます。',
'###userName###のいいところは決断力です。###userName###がする決断にいつも助けられる人がいます。',
'###userName###のいいところは思いやりです。###userName###に気をかけてもらった多くの人が感謝しています。',
'###userName###のいいところは感受性です。###userName###が感じたことに皆が共感し、わかりあうことができます。',
'###userName###のいいところは節度です。強引すぎない###userName###の考えに皆が感謝しています。',
'###userName###のいいところは好奇心です。新しいことに向かっていく###userName###の心構えが多くの人に魅力的に映ります。',
'###userName###のいいところは気配りです。###userName###の配慮が多くの人を救っています。',
'###userName###のいいところはそのすべてです。ありのままの###userName###自身がいいところなのです。',
'###userName###のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる###userName###が皆から評価されています。',
]

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザの名前
 * @return {string} 診断結果
 */
function assessment(userName) {
let sumOfCharCode = 0;
for (let i = 0; i < userName.length; i++) {
   sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
}

  // 文字のコード番号の合計を回答の数で割って添字の数値を求める
   const index = sumOfCharCode % answers.length;
   let result = answers[index];

   result = result.replaceAll('###userName###',userName);
  return result;
}

function test() {
  console.log('診断結果の文章のテスト');

  //太郎
  console.log('太郎');
  console.assert(
    assessment('太郎') ===
    '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );

    //次郎
  console.log('次郎');
  console.assert(
    assessment('次郎') ===
      '次郎のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる次郎が皆から評価されています。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );

  //花子
  console.log('花子');
  console.assert(
    assessment('花子') ===
      '花子のいいところはまなざしです。花子に見つめられた人は、気になって仕方がないでしょう。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );
  
  console.log('診断結果の文章のテスト終了');
}

test();