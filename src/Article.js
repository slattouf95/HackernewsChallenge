import React from 'react';
import Card from './Card';
import styled from 'styled-components';
import useArticle from './useArticle';

const StyledRoot = styled.div`
padding: 50px 12px;
`;

const StyledContainer = styled.div`
margin: auto;
max-width: 550px;
width: 100%;
`;

const Article = ({id}) => {
  const article = useArticle(id);

  return(     
    <StyledRoot>
      <StyledContainer>
        <Card
          articleID={id}
          title={article?.title}
          text={article?.text}
          date={new Date(article?.time*1000).toLocaleDateString("en-US")}
          comments={article?.kids}
        />  
      </StyledContainer>
    </StyledRoot>
  )
};

export default Article;