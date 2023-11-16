import { render, screen } from "@testing-library/react"
import NotFound from "./404"

describe('404', () => {
    test('renders page', async () => {
        render(<NotFound />);

        expect(await screen.findByText("404")).toBeVisible();
    })
})