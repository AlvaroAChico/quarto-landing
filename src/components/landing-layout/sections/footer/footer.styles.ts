import styled from "styled-components"
import { breakpoints } from "../../../../constants/breakpoints"

export const FooterWrapper = styled.footer`
  background-color: #fff;
  border-color: #e1e1e1;
  border-top-width: 1px;
  border-top-style: solid;
  z-index: 0;
  display: flex;
  // min-height: 380px;
  height: fit-content;
  width: 100%;
  flex-direction: column;
  overflow: hidden;
  justify-content: space-between;
  padding: 40px;
`

export const FooterContent = styled.div`
  grid-template-columns: repeat(4, 1fr);
  display: grid;
  width: 100%;
  gap: 25px;

  ${breakpoints.tabletLargeMax} {
    grid-template-columns: repeat(2, 1fr);
    justify-items: center;
  }

  ${breakpoints.tabletSmallMax} {
    grid-template-columns: 1fr;
    justify-items: flex-start;

    > div:nth-child(4) {
      display: none;
    }
  }
`

export const FooterColumn = styled.div`
  flex-direction: column;
  justify-content: start;
  width: fit-content;
  align-items: start;
  display: flex;
`
export const LogoWrapper = styled.div`
  > img {
    max-width: 150px;
    width: 100%;
  }
`
export const SocialMediaLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: start;
`

export const SocialMediaIcon = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 24px;
  align-self: stretch;
  margin: auto 0;
`

export const WhatsAppButton = styled.button`
  border-radius: 9999px;
  background-color: #00c49a;
  display: flex;
  margin-top: 48px;
  align-items: center;
  gap: 8px;
  overflow: hidden;
  color: #000;
  white-space: nowrap;
  justify-content: center;
  padding: 16px 24px;
  font:
    400 16px/1 Inter,
    sans-serif;
  border: none;
  cursor: pointer;
`

export const FooterLinkList = styled.ul`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: start;
  list-style-type: none;
  padding: 0;
  margin: 0;
`

export const FooterLinkTitle = styled.h3`
  display: flex;
  width: 100%;
  padding-bottom: 12px;
  flex-direction: column;
  font-size: 16px;
  font-weight: 700;
  justify-content: start;
`

export const FooterLink = styled.li`
  margin-top: 12px;
  font:
    400 14px/1.4 DM Sans,
    sans-serif;
`

export const AppStoreLinks = styled.div`
  display: flex;
  margin-top: 12px;
  width: 138px;
  max-width: 100%;
  flex-direction: column;
  justify-content: start;
`

export const AppStoreImage = styled.img`
  aspect-ratio: 3.29;
  object-fit: contain;
  object-position: center;
  width: 100%;
  margin-top: 8px;
`

export const Copyright = styled.div`
  align-self: center;
  margin-top: 57px;
  gap: 24px;
  color: #676767;
  font:
    400 12px/1.4 DM Sans,
    sans-serif;

  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
  }
`
