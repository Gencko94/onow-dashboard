import { useForm } from "react-hook-form";
import styled from "styled-components";
import { STORE_SEO } from "../../interfaces/settings/store-seo/store-seo";
import Breadcrumbs from "../../components/reusable/Breadcrumbs";
import { MdTitle } from "react-icons/md";
import IconedInput from "../../components/reusable/IconedInput";
import Textarea from "../../components/reusable/Textarea";

const StoreSEO = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<STORE_SEO>({
    defaultValues: {
      description: "Your Store Description Here",
      title: "Your Store Name here",
    },
  });
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
              <IconedInput
                Icon={MdTitle}
                errors={errors?.title}
                label="Home Page Title"
                name="title"
                register={register}
                required
                requiredMessage="This field is required"
              />
              <Textarea
                errors={errors?.description}
                label="Store Description"
                name="description"
                register={register}
                required
                requiredMessage="This field is required"
              />
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
