//
//  Array+Extensions.swift
//  AnonymousChat
//
//  Created by Александр on 19.09.2025.
//

enum SortType {
    case desc, asc
}

extension Array where Element: Comparable {
    func sortInOrder(of order: SortType) -> [Self.Element] {
        switch order {
        case .desc:
            self.sorted(by: { (a, b) in a > b })
        case .asc:
            self.sorted(by: { (a, b) in a < b })
        }
    }
}

extension Array {
    func sortInOrder<Path: Comparable>(of order: SortType, by path: KeyPath<Element, Path>) -> [Self.Element] {
        switch order {
        case .desc:
            self.sorted(by: { (a, b) in a[keyPath: path] > b[keyPath: path] })
        case .asc:
            self.sorted(by: { (a, b) in a[keyPath: path] < b[keyPath: path] })
        }
    }
}
