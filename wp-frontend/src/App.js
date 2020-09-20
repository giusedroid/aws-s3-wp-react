import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

const wpRoot = 'https://demo.wp-api.org/wp-json/wp/v2';

const download = content => fetch(`${wpRoot}/${content}`).then(res => res.json());
const articlePreview = props => <div key={props.id}>
  <h2>{props.title.rendered}</h2>
  <h3>{props.date}</h3>
  <div dangerouslySetInnerHTML={{__html:props.excerpt.rendered}}></div>
</div>;

function App() {

  const [wpContent, setWpContent] = useState([]);
  async function fetchData(){
    const data = await download('posts');
    setWpContent(data);
  }
  useEffect(() => {fetchData()}, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a href="https://github.com/giusedroid/aws-s3-wp-react">
          Wordpress + React + Amazon S3
        </a>
      </header>
      <>
        {wpContent.map(articlePreview)}
      </>
    </div>
  );
}

export default App;
