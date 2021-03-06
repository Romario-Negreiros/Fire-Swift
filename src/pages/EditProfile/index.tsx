import React from 'react';

import hobbies from '../../app/hobbies';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { updateUser } from '../../features/user/userSlice';
import { firestoredb } from '../../lib';
import getUserListData from '../../utils/getters/getUserListData';
import handleError from '../../utils/general/handleError';
import handleFirebaseError from '../../utils/general/handleFirebaseError';
import { toast } from 'react-toastify';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import Logo from '../../assets/logo.png';

import { CenteredContainer, ErrorBorder, ErrorMessage } from '../../global/styles';
import { FormBorder, Form, Grid, Wrapper, Container } from './styles';
import { Exception, DraggableList, Loader } from '../../components';

interface Data {
  countriesNames: {
    name: string;
  }[];
  countriesLanguages: {
    name: string;
  }[];
  hobbies: {
    name: string;
  }[];
}

interface Inputs {
  bio: string;
  age: number;
  relationship: string;
  country: string;
}

interface Response {
  name: string;
  languages: {
    nativeName: string;
  }[];
  flags: {
    svg: string;
  };
}

const EditProfile: React.FC = () => {
  const currentUser = useAppSelector(state => state.user.user);
  const { register, handleSubmit, setValue } = useForm<Inputs>();
  const [isLoaded, setIsLoaded] = React.useState(true);
  const [error, setError] = React.useState('');
  const [data, setData] = React.useState<Data>();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<Inputs> = async data => {
    try {
      if (currentUser) {
        const userData = getUserListData(['languages', 'hobbies']);
        setIsLoaded(false);
        const userRef = firestoredb.doc(firestoredb.db, 'users', currentUser.id);
        await firestoredb.updateDoc(userRef, {
          ...data,
          ...userData,
        });
        dispatch(updateUser({ ...currentUser, ...data, ...userData }));
        toast('Succesfully updated the data!');
        history.goBack();
      }
    } catch (err) {
      handleFirebaseError(err, setError);
    } finally {
      setIsLoaded(true);
    }
  };

  const fetchData = React.useCallback(
    async (countries: string) => {
      if (currentUser) {
        try {
          const response = await fetch(countries);
          const json = (await response.json()) as Response[];
          const data: Partial<Data> = {};
          data['countriesNames'] = json.map(country => {
            return { name: country.name };
          });
          const countriesLanguages: Data['countriesLanguages'] = [];
          json.forEach(country => {
            if (
              countriesLanguages.some(
                lang => lang.name === country.languages[country.languages.length - 1].nativeName
              )
            )
              return;
            countriesLanguages.push({
              name: country.languages[country.languages.length - 1].nativeName,
            });
          });
          data['countriesLanguages'] = [
            ...countriesLanguages,
          ] as unknown as Data['countriesLanguages'];
          data['hobbies'] = hobbies;
          setData(data as Data);
        } catch (err) {
          handleError(err, 'fetching countries for list.', setError);
        } finally {
          setValue('country', currentUser.country);
        }
      }
    },
    [currentUser, setValue]
  );

  React.useEffect(() => {
    if (currentUser) {
      fetchData('https://restcountries.com/v2/all?fields=name,languages,flags');
      setValue('bio', currentUser.bio);
      setValue('relationship', currentUser.relationship);
      if (currentUser.age) setValue('age', currentUser.age);
    }
  }, [currentUser, setValue, fetchData]);

  if (!currentUser) {
    const message = 'User not found or not logged in!';
    return (
      <CenteredContainer>
        <Exception message={message} />
      </CenteredContainer>
    );
  } else if (!isLoaded) {
    return (
      <CenteredContainer>
        <Loader />
      </CenteredContainer>
    );
  }
  const ages: number[] = [];
  for (let x = 11; x < 99; x++) {
    ages.push(x);
  }
  return (
    <Container>
      {error && (
        <ErrorBorder>
          <ErrorMessage>
            <p>{error}</p>
          </ErrorMessage>
        </ErrorBorder>
      )}
      <FormBorder>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="logo">
            <img src={Logo} alt="logo" />
            <h1>Edit Profile</h1>
          </div>
          <Grid>
            <Wrapper>
              <p>Bio</p>
              <input {...register('bio')} />
            </Wrapper>
            <Wrapper>
              <p>Age</p>
              <select {...register('age')}>
                {ages.map((v, i) => (
                  <option key={`option-${i}`} value={i === 0 ? '' : v}>
                    {i === 0 ? 'Select...' : v}
                  </option>
                ))}
              </select>
            </Wrapper>
            <Wrapper>
              <p>Country</p>
              <select {...register('country')}>
                {data?.countriesNames?.map((country, i) => (
                  <option key={`option-${i}`} value={i === 0 ? '' : country.name}>
                    {i === 0 ? 'Select...' : country.name}
                  </option>
                ))}
              </select>
            </Wrapper>
            <Wrapper>
              <p>Relationship</p>
              <select {...register('relationship')}>
                <option value="">Select...</option>
                <option value="Married">Married</option>
                <option value="Single">Single</option>
                <option value="Dating">Dating</option>
              </select>
            </Wrapper>
          </Grid>
          {data && (
            <>
              <DraggableList
                title="languages"
                userData={currentUser.languages}
                data={data.countriesLanguages}
              />
              <DraggableList title="hobbies" userData={currentUser.hobbies} data={data.hobbies} />
            </>
          )}

          <button type="submit">Save updates</button>
        </Form>
      </FormBorder>
    </Container>
  );
};

export default EditProfile;
