import styled from "styled-components"

export const PropertyDescription = () => {
  return (
    <section>
      <SectionTitle>Descripción</SectionTitle>
      <Description>
        Lorem ipsum dolor sit amet consectetur. Sed duis nullam pharetra a
        feugiat lectus egestas egestas. Egestas tortor sapien pharetra et urna
        enim malesuada lectus eget. Est senectus lacus accumsan pellentesque. Ac
        libero justo vel nibh. Vitae non quam lorem posuere vel tempor urna
        diam.
        <br />
        <br />
        Est eu id amet nullam. Lobortis rutrum venenatis ipsum nibh mi duis enim
        sed diam. Diam vitae vulputate est eu amet. Id mi posuere sit velit
        interdum egestas feugiat nisl. Vitae integer justo et arcu. Volutpat
        elementum molestie tincidunt donec. Orci vitae euismod mi ut ipsum.
        Adipiscing nisl purus eu dui. Mauris a dolor semper felis massa
        fermentum sodales. Senectus amet.
      </Description>
    </section>
  )
}

const SectionTitle = styled.h2`
  font-family: Raleway, sans-serif;
  font-size: 22px;
  font-weight: 600;
  color: #242424;
  margin-bottom: 16px;
`

const Description = styled.p`
  color: #6b7280;
  font-size: 14px;
  line-height: 1.4;
`
