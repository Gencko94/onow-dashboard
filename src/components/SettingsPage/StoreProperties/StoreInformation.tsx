import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { AiOutlinePhone } from "react-icons/ai";
import { MdSubtitles } from "react-icons/md";
import Select, { GroupTypeBase, Styles } from "react-select";
import styled from "styled-components";
import { COUNTRY, countryList } from "../../../data/countryList";
import { STORE_INFORMATION } from "../../../interfaces/settings/store-properties/store-properties";
import IconedInput from "../../reusable/IconedInput";

const StoreInformation = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useForm<STORE_INFORMATION>();
  const {
    i18n: { language },
  } = useTranslation();
  const selectStyles:
    | Partial<Styles<COUNTRY, false, GroupTypeBase<COUNTRY>>>
    | undefined = useMemo(() => {
    return {
      control: (provided: any, state: any) => ({
        ...provided,
        fontSize: "0.9rem",
        minHeight: "35px",
      }),
      dropdownIndicator: (provided: any, state: any) => ({
        ...provided,
        padding: "6px",
        display: "grid",
      }),
      option: (provided: any) => ({
        ...provided,
        fontSize: "0.9rem",
      }),
      menu: (provided: any) => ({
        ...provided,

        zIndex: 200,
      }),
    };
  }, []);
  return (
    <Container>
      <div className="title-container">
        <h5>Store Information</h5>
      </div>
      <Box>
        <div className="section">
          <h6 className="section-title">Store Name</h6>
          <div className="store-name-grid">
            <IconedInput
              Icon={MdSubtitles}
              errors={errors}
              register={register}
              name="name.en"
              required
              requiredMessage="Name Required"
              label="Store Name English"
            />

            <IconedInput
              Icon={MdSubtitles}
              errors={errors}
              register={register}
              name="name.ar"
              required
              requiredMessage="Name Required"
              label="Store Name Arabic"
            />

            <div className="description">
              <label>Store Description</label>

              <textarea
                rows={4}
                {...register("description", { required: "Required" })}
              />

              <p className="error">{errors?.description?.message}</p>
            </div>
          </div>
        </div>

        <div className="section">
          <h6 className="section-title">Store Headquarters</h6>
          <div className="store-headquarters">
            <div>
              <label>Country</label>
              <Controller
                name="headquarters.country"
                control={control}
                rules={{ required: "Required" }}
                render={({ field: { ref, onChange } }) => (
                  <>
                    <Select
                      ref={ref}
                      styles={selectStyles}
                      placeholder="Select Variation Type..."
                      options={countryList}
                      defaultValue={countryList[0]}
                      isSearchable={false}
                      getOptionLabel={(option) => option.name[language]}
                      getOptionValue={(option) => option.code}
                      onChange={(value) => {
                        onChange(value?.code);
                      }}
                    />
                    <p className="error">
                      {errors?.headquarters?.country?.message}
                    </p>
                  </>
                )}
              />
            </div>
            <div>
              <label>City</label>
              <Controller
                name="headquarters.city"
                control={control}
                rules={{ required: "Required" }}
                render={({ field: { ref, onChange } }) => (
                  <>
                    <Select
                      ref={ref}
                      styles={selectStyles}
                      placeholder="Select Variation Type..."
                      options={countryList}
                      defaultValue={countryList[0]}
                      isSearchable={false}
                      getOptionLabel={(option) => option.name[language]}
                      getOptionValue={(option) => option.code}
                      onChange={(value) => {
                        onChange(value?.code);
                      }}
                    />
                    <p className="error">
                      {errors?.headquarters?.city?.message}
                    </p>
                  </>
                )}
              />
            </div>
            <div>
              <label>Avenue</label>
              <input
                className="input"
                {...register("headquarters.avenue", { required: "Required" })}
              />
              <p className="error">{errors?.headquarters?.avenue?.message}</p>
            </div>
            <div>
              <label>Street</label>
              <input
                className="input"
                {...register("headquarters.street", { required: "Required" })}
              />
              <p className="error">{errors?.headquarters?.street?.message}</p>
            </div>
            <div>
              <label>Building Number</label>
              <input
                className="input"
                {...register("headquarters.buildingNo", {
                  required: "Required",
                })}
              />
              <p className="error">
                {errors?.headquarters?.buildingNo?.message}
              </p>
            </div>
            <div>
              <label>P.O Address</label>
              <input
                className="input"
                {...register("headquarters.poAddress", {
                  required: "Required",
                })}
              />
              <p className="error">
                {errors?.headquarters?.poAddress?.message}
              </p>
            </div>
          </div>
        </div>
        <div className="save-container">
          <button>Save Changes</button>
        </div>
      </Box>
    </Container>
  );
};

export default StoreInformation;
const Container = styled.div`
  .title-container {
    padding: 2rem 0;
    color: ${(props) => props.theme.mainColor};
  }
`;

const Box = styled.div`
  box-shadow: ${(props) => props.theme.shadow};
  border-radius: 6px;
  background-color: #fff;
  .section {
    border-bottom: ${(props) => props.theme.border};
    padding: 1rem;
    .section-title {
      margin-bottom: 1.5rem;
      font-size: 1.1rem;
      font-weight: ${(props) => props.theme.font.xbold};
    }

    .error {
      height: 20px;
      font-size: 0.7rem;
      padding-top: 0.25rem;
      color: ${(props) => props.theme.dangerRed};
    }

    .store-name-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;

      .description {
        grid-column: 1/3;
        textarea {
          width: 100%;
          border: ${(props) => props.theme.border};
          border-radius: 6px;
          background-color: ${(props) => props.theme.accentColor};
          padding: 0.4rem;
          font-size: 0.9rem;
        }
      }
    }
    .store-headquarters {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 1rem;
      row-gap: 0.5rem;
      label {
        color: ${({ theme }) => theme.headingColor};
        margin-bottom: 0.4rem;
        font-size: 0.9rem;
        font-weight: ${(props) => props.theme.font.regular};
        display: inline-block;
      }
      input.input {
        flex: 1;
        padding: 0.4rem;
        font-size: 0.9rem;
        width: 100%;
        background-color: #fff;
        border: ${(props) => props.theme.border};
        border-radius: 6px;
      }
    }
  }
  .save-container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    button {
      background-color: ${(props) => props.theme.green};
      padding: 0.5rem;
      border-radius: 6px;
      color: #fff;
    }
  }
`;
