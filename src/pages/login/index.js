import {Button, Checkbox, Form, Input} from 'antd';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import Title from "antd/es/typography/Title";
import AuthService from "../../services/authService";
import './index.css'
import {useState} from "react";
import Spinner from "../../components/extra/spinner";
import {useDispatch} from "react-redux";
import {signIn} from "../../redux/authReducer";
import swal from 'sweetalert';
import {useHistory} from "react-router-dom";


export default function Login(){
  const authService = new AuthService()
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()
  document.body.style.background = 'linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(80,183,110,1) 100%)';

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    let userCredentials = {username: values.username, password: values.password}

    setIsLoading(true);

    authService.SignIn(userCredentials).then(res=>{
      if (res.headers.jwt) {
        localStorage.setItem('token', res.headers.jwt)
        localStorage.setItem('user', JSON.stringify(res.data))
        dispatch(signIn(res.data))
        history.push('/app/my_files')
      }
      setIsLoading(false)
      if (res.data.id) {
        swal('Success!', 'You signed in!', 'success')
      }
      console.log(res)
    }).catch(()=>{
      swal('Error!', 'Something went wrong!', 'error')
      setIsLoading(false)
    })
  };

  return (
    <div className={'auth_container'}>
      <div className={'inner_auth_container'}>
        <Title level={4} style={{padding: '3% 0'}}>
          Авторизация в систему
        </Title>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Введите ваш логин!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Логин" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Введите ваш пароль!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Пароль"
            />
          </Form.Item>
          <Form.Item>
            <div style={{display: 'flex', justifyContent: "space-between"}}>

              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Запомнить меня</Checkbox>
              </Form.Item>

              <a style={{display: 'block'}} href="/forgot_password">
                Забыли пароль?
              </a>
            </div>
          </Form.Item>

          <Form.Item>
            <Button type="primary" icon={isLoading && <Spinner/>} disabled={isLoading} htmlType="submit" style={{width: '100%', margin: '3% 0'}} danger>
              {!isLoading && 'Войти в систему'}
            </Button>
            <a href="/">Вернуться на главную</a>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
