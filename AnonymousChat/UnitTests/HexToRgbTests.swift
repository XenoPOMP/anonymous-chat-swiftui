//
//  HexToRgbTests.swift
//  UnitTests
//
//  Created by Александр on 19.09.2025.
//

import Testing
import SwiftUI
@testable import AnonymousChat

struct HexToRgbTests {

    private func testColor(hex: String, red: CGFloat, green: CGFloat, blue: CGFloat, opacity: CGFloat = 1.0) {
        let colorHex = Color(hex: hex)
        #expect(colorHex == Color(red: red, green: green, blue: blue, opacity: opacity))
    }
    
    @Test func hexToRgb() async throws {
        testColor(hex: "#FF0000", red: 1.0, green: 0.0, blue: 0.0)
        testColor(hex: "#00FF00", red: 0.0, green: 1.0, blue: 0.0)
        testColor(hex: "#0000FF", red: 0.0, green: 0.0, blue: 1.0)
    }

}
