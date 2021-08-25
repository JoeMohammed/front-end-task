import { Container } from "react-bootstrap";
import CountryList from "./countryList";

export default function CountryListSection(props) {
  return (
      <section>
        <Container>
          <CountryList />
        </Container>
      </section>
  );
}
