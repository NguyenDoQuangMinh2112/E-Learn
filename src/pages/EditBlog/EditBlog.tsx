import classNames from 'classnames/bind'
import styles from './EditBlog.module.scss'
import turndown from 'turndown'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { editBlogApi, getDetailBlogAPI } from '~/apis/blogs'
import Button from '~/components/Button'
import { FaRegSave } from 'react-icons/fa'
import Spinner from '~/components/Spinner/Spinner'
import { toast } from 'react-toastify'

const cx = classNames.bind(styles)

// Initialize MarkdownIt
const mdParser = new MarkdownIt()

interface EditorChangeEvent {
  html?: string
  text: string
}

const EditBlog = () => {
  const [title, setTitle] = useState<string | undefined>('')
  const [content, setContent] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { id } = useParams()
  const td = new turndown()

  const handleEditorChange = ({ text }: EditorChangeEvent) => {
    setContent(text)
  }

  const handleEditBlog = async () => {
    const htmlContent = mdParser.render(content)

    const payload = {
      title,
      content: [htmlContent]
    }
    try {
      setIsLoading(true)
      const res = await editBlogApi(String(id), payload)
      toast.success(res.message)
    } catch (error: any) {
      toast.error(error.response.data.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const getBlogData = async () => {
      const blog = await getDetailBlogAPI(String(id))
      if (blog.statusCode === 200) {
        setTitle(blog.data.title)
        const htmlContent = blog.data.content[0]
        const markdownContent = td.turndown(htmlContent)
        setContent(markdownContent)
      }
    }
    getBlogData()
  }, [id])
  return (
    <>
      <div className={cx('containers')}>
        <section>
          <input
            className={cx('wrapper', 'title')}
            value={title}
            onChange={(e: any) => setTitle(e.target.value)}
            placeholder="Tiêu đề"
            style={{ width: '100%' }}
          />
          <div className={cx('text-editor')}>
            <MdEditor
              style={{ height: '500px' }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={handleEditorChange}
              value={content}
            />
          </div>

          <Button
            className={cx('saveBtn')}
            onClick={handleEditBlog}
            leftIcon={!isLoading && <FaRegSave color="white" size={20} />}
          >
            {isLoading ? <Spinner color="#fff" /> : 'save'}
          </Button>
        </section>
      </div>
    </>
  )
}

export default EditBlog
