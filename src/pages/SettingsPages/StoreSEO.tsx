import { useForm } from "react-hook-form";
import styled from "styled-components";
import { STORE_SEO } from "../../interfaces/settings/store-seo/store-seo";
import Breadcrumbs from "../../components/reusable/Breadcrumbs";
import { MdTitle } from "react-icons/md";
import IconedInput from "../../components/reusable/Inputs/IconedInput";
import Textarea from "../../components/reusable/Textarea";
import Heading from "../../components/StyledComponents/Heading";
import { up } from "../../utils/themes";
import Box from "../../components/reusable/Box/Box";
import Spacer from "../../components/reusable/Spacer";
import Flex from "../../components/StyledComponents/Flex";
import Button from "../../components/reusable/Button";

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
      <Heading tag="h5" type="large-title">
        Search Engine Optimizations
      </Heading>
      <Breadcrumbs
        withoutTitle
        children={[
          {
            name: { ar: "الإعدادات", en: "Settings" },
            target: "/settings",
          },
          {
            name: { ar: "تحسينات محرك البحث", en: "SEO Improvements" },
            target: "",
          },
        ]}
      />
      <Spacer size={40} />
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
      </Box>
      <Spacer size={20} />
      <Flex justify="center">
        <Button size="md" color="green">
          Save Changes
        </Button>
      </Flex>
    </div>
  );
};

export default StoreSEO;

const Grid = styled.div(
  ({ theme: { breakpoints } }) => `
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  

  ${up(breakpoints.md)}{
    grid-template-columns: 1fr 1fr;
   

  }
  `
);
const Demo = styled.div`
  padding: 0.5rem;
  align-self: center;
  border: ${(props) => props.theme.border};
  .title {
    color: ${(props) => props.theme.blue};
    font-size: 1.1rem;
    /* font-weight: ${(props) => props.theme.font.semibold}; */
  }
  .link {
    color: ${(props) => props.theme.green};
    font-size: 0.8rem;
  }
  .description {
    font-size: 0.8rem;
    color: ${(props) => props.theme.textAlt};
  }
`;
