import * as React from 'react'
import { useHistory, Link } from 'react-router-dom';
import { db, postCollection } from '../../firebase/apps';
import { Formik, Form, Field } from 'formik'
import { Post, createPostModel, initialPost } from '../../models/Post';
import { Container } from '../../components/container';

const post = async (values: Post) => {
  try {
    await db.collection(postCollection).add(createPostModel(values))

  } catch (error) {
    console.error(error);
  }
}

const Add: React.FC = () => {
  const [isPosting, setIsPosting] = React.useState(false)
  const history = useHistory()

  const initialValue: Post = initialPost
  const today = new Date()
  const dateFormat = `${today.getFullYear()}.${today.getMonth()}.${today.getDate()}`
  initialPost.title = dateFormat

  return (
    <Container>
      <h2>Add</h2>
      <Link to='/daily/list'>トップへ</Link>

      <Formik
        initialValues={initialValue}
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);
          setIsPosting(true)
          post(values)

          history.replace('/daily/list')
        }}
      >
        {(formikBag) => (
        <Form>
          <Field name="title">
            {({field, form, meta}) => (
              <div>
                <label htmlFor="title">title</label>
                <input type="text" id="title" {...field} />
                {meta.touched && meta.error && meta.error}
              </div>
            )}
          </Field>

          <Field name="body" >
            {({field, form, meta}) => (
              <div>
                <label htmlFor="body">body</label>
                <textarea {...field} id="body" placeholder="" />
                {meta.touched && meta.error && meta.error}
              </div>
            )}
          </Field>
          <button type="submit" disabled={isPosting}>Submit</button>
        </Form>
        )}
      </Formik>
    </Container>
  )
}

export { Add }
