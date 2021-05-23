import { useForm } from "react-hook-form";
import styled from "styled-components";
import { STORE_SEO } from "../../interfaces/settings/store-seo/store-seo";
import Breadcrumbs from "../../components/reusable/Breadcrumbs";
import { MdTitle } from "react-icons/md";

const StoreSEO = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<STORE_SEO>();
  const values = watch();
  return (
    <div>
      <Breadcrumbs
        childLabel="SEO Improvments"
        parentLabel="Settings"
        parentTarget="/settings"
      />
      <Container>
        <div className="title-container">
          <h5>Store SEO</h5>
        </div>
        <Box>
          <Grid>
            <div>
              <div>
                <label>Home Page Title</label>
                <div className="input-container">
                  <span className="icon">
                    <MdTitle size={20} />
                  </span>
                  <input {...register("title", { required: "Required" })} />
                </div>
                <p className="error">{errors?.title?.message}</p>
              </div>
              <div className="description">
                <label>Store Description</label>

                <textarea
                  rows={4}
                  {...register("description", { required: "Required" })}
                />

                <p className="error">{errors?.description?.message}</p>
              </div>
            </div>
            <Demo>
              <p className="link">https://Flowersplus.com</p>
              <p className="title">{values.title}</p>
              <p className="description">{values.description}</p>
            </Demo>
          </Grid>
          <div className="save-container">
            <button>Save Changes</button>
          </div>
        </Box>
      </Container>
    </div>
  );
};

export default StoreSEO;
const Container = styled.div`
  .title-container {
    padding: 2rem 0;
    color: ${(props) => props.theme.mainColor};
  }
`;
const Box = styled.div`
  box-shadow: ${(props) => props.theme.shadow};
  border-radius: 6px;
  padding: 1rem;
  background-color: #fff;

  .input-container {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.theme.inputColorLight};
    color: ${(props) => props.theme.headingColor};
    border: ${(props) => props.theme.border};
    border-radius: 5px;
  }
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    color: ${(props) => props.theme.headingColor};
    font-weight: ${(props) => props.theme.font.light};
  }
  .icon {
    padding: 0.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${(props) => props.theme.subHeading};
  }
  input {
    flex: 1;
    padding: 0.4rem;
    font-size: 0.9rem;
    width: 50px;
    background-color: #fff;
  }
  .error {
    height: 20px;
    font-size: 0.7rem;
    padding-top: 0.25rem;
    color: ${(props) => props.theme.dangerRed};
  }
  .description {
    textarea {
      width: 100%;
      border: ${(props) => props.theme.border};
      border-radius: 6px;
      background-color: ${(props) => props.theme.accentColor};
      padding: 0.4rem;
      font-size: 0.9rem;
    }
  }
  .save-container {
    display: flex;
    align-items: center;
    justify-content: center;
    button {
      background-color: ${(props) => props.theme.green};
      padding: 0.5rem;
      border-radius: 6px;
      color: #fff;
    }
  }
`;
const Grid = styled.div(
  ({ theme: { breakpoints } }) => `
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  

  @media ${breakpoints.md}{
    grid-template-columns: 1fr 1fr;
   

  }
  `
);
const Demo = styled.div`
  padding: 0.5rem;
  align-self: center;
  border: ${(props) => props.theme.border};
  .title {
    color: #1a0dab;
    font-size: 1.1rem;
    /* font-weight: ${(props) => props.theme.font.semibold}; */
  }
  .link {
    color: #267c2d;
    font-size: 0.8rem;
  }
  .description {
    font-size: 0.8rem;
    color: #666666;
  }
`;
