$(function () {
  $('.button-more').on('mouseover', function () {
    $(this).animate(
      {
        opacity: 0.5,
        marginLeft: 20,
      },
      100
    );
  });
  $('.button-more').on('mouseout', function () {
    $(this).animate(
      {
        opacity: 1.0,
        marginLeft: 0,
      },
      100
    );
  });
  $('.carousel').slick({
    autoplay: true,
    dots: true,
    infinite: true,
    autoplaySpeed: 5000,
    arrows: false,
  });

  //AjaxでSTATIC FORMにデータを送信
  $('#submit').on('click', function (event) {
    //formタグによる送信を拒否
    //'event'は関数名
    event.preventDefault();
    //入力チェックをした結果、エラーがあるかないか判定
    let result = inputCheck();

    //エラー判定とメッセージを取得
    let error = result.error;
    let message = result.message;

    //エラーが無かったらフォームを送信する
    if (error == false) {
      //Ajaxでformを送信する
      $.ajax({
        url: 'https://api.staticforms.xyz/submit',
        type: 'POST',
        dataType: 'json',
        data: $('#form').serialize(),
        success: function (result) {
          alert('お問い合わせを送信しました。');
        },
        error: function (xhr, resp, text) {
          alert('お問い合わせを送信できませんでした。');
        },
      });
    } else {
      //エラーメッセージを表示する
      alert(message);
    }
  });

  //blurイベントはHTML要素からフォーカスが外れたときに
  //（別のHTML要素がフォーカスされたときに）発生
  $('#name').blur(function () {
    inputCheck();
  });
  $('#furigana').blur(function () {
    inputCheck();
  });
  $('#email').blur(function () {
    inputCheck();
  });
  $('#tel').blur(function () {
    inputCheck();
  });
  $('#message').blur(function () {
    inputCheck();
  });
  $('#agree').click(function () {
    inputCheck();
  });

  //お問い合わせフォームの入力チェック

  function inputCheck() {
    //動作チェックの関数動作
    // console.log('inputCheck関数の呼び出し');
    //エラーチェック結果
    let result;
    //エラーメッセージのテキスト
    let message = '';
    //エラーがなければfalse,エラーがあればtrue
    let error = false;
    //お名前のチェック
    if ($('#name').val() == '') {
      //エラーあり
      $('#name').css('background-color', '#f79999');
      error = true;
      message += 'お名前を入力してください。 \n';
    } else {
      //エラーなし
      $('#name').css('background-color', '#fafafa');
    }
    if ($('#furigana').val() == '') {
      $('#furigana').css('background-color', '#f79999');
      error = true;
      message += 'フリガナを入力してください。\n';
    } else {
      $('#furigana').css('background-color', '#fafafa');
    }
    if ($('#message').val() == '') {
      $('#message').css('background-color', '#f79999');
      error = true;
      message += 'メッセージを入力してください。 \n';
    } else {
      $('#message').css('background-color', '#fafafa');
    }

    //メールアドレスのチェック
    //indexOf('文字列')メソッドは、
    //指定した文字（今回の場合は@や.）
    //が「対象の何文字目に含まれているか」
    //を数値で返すメソッド

    if (
      $('#email').val() == '' ||
      $('#email').val().indexOf('@') == -1 ||
      $('#email').val().indexOf('.') == -1
    ) {
      $('#email').css('background-color', '#f79999');
      error = true;
      message +=
        'メールアドレスが未記入、または「@」「.」が含まれていません。\n';
    } else {
      $('#email').css('background-color', '#fafafa');
    }
    if ($('#tel').val() != '' && $('#tel').val().indexOf('-') == -1) {
      $('#tel').css('background-color', '#f79999');
      error = true;
      message += '電話番号に「-」が含まれていません。\n';
    } else {
      $('#tel').css('background-color', '#fafafa');
    }

    if ($('#agree').prop('checked') == false) {
      error = true;
      message +=
        '個人情報の取り扱いについてご同意いただける場合は、チェックボックスにチェックしてください。 \n';
    }

    if (error == true) {
      $('#submit').attr('src', 'images/button-submit.png');
    } else {
      $('#submit').attr('src', 'images/button-submit-blue.png');
    }
    result = {
      error: error,
      message: message,
    };
    return result;
  }
});
