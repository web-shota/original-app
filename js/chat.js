import firebase from 'firebase'

// ログインフォームが送信されたらログインする
$('#login-form').on('submit', (e) => {
// フォームを初期状態に戻す
  resetLoginForm();
  // ログインボタンを押せないようにする
  $('#login__submit-button')
    .prop('disabled', true)
    .text('送信中…')
    
  const email = $('#login-email').val();
  const password = $('#login-password').val();
  
  // ログインを試みて該当ユーザが存在しない場合は新規作成する
  // ログインを試みる
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch((error) => {
      console.log('ログイン失敗:', error);
      if (error.code === 'auth/user-not-found') {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(() => {
            console.log('ユーザを作成しました');
          })
          .catch(catchErrorOnCreateUser);
      } else {
        catchErrorOnSignIn(error);
      }
    });
    
  // 現在ログインしているユーザID
  let currentUID;
    
  const onLogin = () => {
    console.log('ログイン完了');

    // ホーム画面を表示
    showView('chat');
  };
  
  // ログイン状態の変化を監視する
  firebase.auth().onAuthStateChanged((user) => {
  // ログイン状態が変化した

    if (user) {
    // ログイン済
      currentUID = user.uid;
      onLogin();
    } else {
    // 未ログイン
      currentUID = null;
      onLogout();
    }
  });
  
});