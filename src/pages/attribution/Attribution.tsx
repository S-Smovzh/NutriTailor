import { Col, List, ListInlineItem, Row } from 'reactstrap';

const Attribution = () => {
  return (
    <Row>
      <Col>
        <h2>List of creators whose work is used in this project</h2>
        <List>
          <ListInlineItem>
            Photos by <a href="https://unsplash.com/@jsnbrsc?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Jason Briscoe</a> on{' '}
            <a href="https://unsplash.com/photos/GrdJp16CPk8?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
          </ListInlineItem>
          <ListInlineItem></ListInlineItem>
          <ListInlineItem></ListInlineItem>
        </List>
      </Col>
    </Row>
  );
};

export { Attribution };
