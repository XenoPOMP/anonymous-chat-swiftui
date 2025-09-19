//
//  UnitTests.swift
//  UnitTests
//
//  Created by Александр on 19.09.2025.
//

import Testing
import Foundation
import SwiftDate
@testable import AnonymousChat

struct UnitTests {

    @Test func baseMessageModelToParsed() async throws {
        let model = MessageModel(
            id: "cmfqs29le0001o431wwjtq696",
            createdAt: "2025-09-19T11:50:00.722Z",
            generatedName: "Middle Lavender Turtle",
            seededColor: "#0e8172",
            textContent: "Hello, world?"
        )
        let parsed = model.parsed
        
        var dateComponents = DateComponents()
        dateComponents.day = 19
        dateComponents.month = 9
        dateComponents.year = 2025
        dateComponents.hour = 11
        dateComponents.minute = 50
        dateComponents.second = 0
        dateComponents.timeZone = .gmt
        let expectedDate: Date = Calendar.current.date(from: dateComponents)!
        
        #expect(parsed.id == "cmfqs29le0001o431wwjtq696")
        
        #expect(parsed.createdAt.compare(.isSameDay(expectedDate)))
        #expect(parsed.createdAt.compare(.isSameMonth(expectedDate)))
        #expect(parsed.createdAt.compare(.isSameYear(expectedDate)))
        
        #expect(parsed.generatedName == "Middle Lavender Turtle")
        #expect(parsed.seededColor == "#0e8172")
        #expect(parsed.textContent == "Hello, world?")
    }

}
