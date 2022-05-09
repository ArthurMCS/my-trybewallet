import styled from 'styled-components';

const WalletStyled = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
text-align: center;
width: 100%;



header {
    display: flex;
    align-items: center;
    margin-top: 20px;
    font-size: 25px;
    width: inherit;


    div {
      margin: 20px;
    }

}

svg {
  color: red;
  height: 30px;
  width: 30px;
  cursor: pointer;
  transition: transform 0.4s;
}

svg:hover {
  transform: scale(1.3);
}

div {
  width: inherit;
}


form {
  margin-top: 50px;
  width: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #454d55;
  color: #fff;
}

button {
  margin: 50px;
}

.form-label {
  margin-right: 15px;
  margin-left: 30px;
}

.form-control {
    width: 150px;
}

`;

export default WalletStyled;
