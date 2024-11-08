import { GravityFormsForm as GravityFormsFormType } from '../generated/graphql';
import { GravityFormProvider } from '../hooks/useGravityForm';
import GravityFormsForm from './GravityFormsForm';

interface Props {
  form: GravityFormsFormType;
}

export default function GravityForm(props: Props) {
  return (
    <GravityFormProvider>
      <GravityFormsForm {...props} />
    </GravityFormProvider>
  );
}
