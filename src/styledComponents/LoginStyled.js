import styled from 'styled-components';

const LoginPage = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    Form {
      height: 400px;
      width: 400px;
      box-shadow: 0px 1px 15px -3px #000000;
      border-radius: 10%;
      margin-top: 13%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      font-size: 25px;
      text-align: center;
      background: #454d55;
      color: #fff;

      button {
        margin-top: 35px;
        width: 230px;
      }
    }
`;

export default LoginPage;
